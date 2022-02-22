FROM alpine:3.15 as builder

WORKDIR /data

COPY . .
RUN apk add --no-cache curl && apk add --no-cache nodejs && apk add --no-cache npm && \
    npm install --only=production --ignore-scripts

FROM alpine:3.15

ARG USER=app
ENV HOME /home/$USER

RUN adduser -D $USER && \
    apk add --no-cache curl && \
    apk add --no-cache jq && \
    apk add --no-cache git && \
    apk add --no-cache nodejs && \
    apk add --no-cache npm && \
    apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
    echo "Asia/Taipei" > /etc/timezone

USER $USER
WORKDIR $HOME

COPY --chown=$USER:$USER --from=builder /data/src/*.ts ./src/
COPY --chown=$USER:$USER --from=builder /data/node_modules ./node_modules
COPY --chown=$USER:$USER --from=builder /data/scripts/run.sh /data/tsconfig.* ./

CMD ["sleep", "86400"]
