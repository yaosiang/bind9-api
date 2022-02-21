FROM alpine:3 as builder

WORKDIR /data

RUN apk add curl && apk add nodejs && apk add npm

COPY package.json ./
RUN npm install --ignore-scripts && curl -s https://gobinaries.com/tj/node-prune | sh && node-prune
COPY . .

FROM alpine:3

ARG USER=app
ENV HOME /home/$USER

RUN apk add sudo && apk add curl && apk add jq && apk add git && apk add nodejs && apk add npm && apk add tzdata && cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime && echo "Asia/Taipei" > /etc/timezone
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

USER $USER
WORKDIR $HOME

COPY --from=builder /data/scripts/run.sh ./run.sh
COPY --from=builder /data/src ./src
COPY --from=builder /data/node_modules ./node_modules
COPY --from=builder /data/tsconfig.base.json ./tsconfig.base.json
COPY --from=builder /data/tsconfig.json ./tsconfig.json
COPY --from=builder /data/tsconfig.production.json ./tsconfig.production.json

RUN sudo chown -R $USER:$USER $HOME

CMD ["sleep", "86400"]
