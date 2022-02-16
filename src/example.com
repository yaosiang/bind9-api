$ORIGIN example.com.
$TTL 86400

; SOA Record
@	 	    IN  SOA dns1.example.com.	hostmaster.example.com.	(
2001062503	 ;serial
21600	 ;refresh
3600	 ;retry
604800	 ;expire
86400	 ;minimum ttl
)

; NS Records
NS	IN	NS	dns1.example.com.
NS	IN	NS	dns2.example.com.

; MX Records
@	IN	MX	10	mail.example.com.
MX	20	IN	MX	20	mail2.example.com.

; A Records
dns1	IN	A	10.0.1.1
dns2	IN	A	10.0.1.2
mail	IN	A	10.0.1.5
mail2	IN	A	10.0.1.6
services	IN	A	10.0.1.10
services	IN	A	10.0.1.11
signin	IN	A	192.168.0.1

; AAAA Records
AAAA	IN	AAAA	aaaa:bbbb::1
AAAA	IN	AAAA	aaaa:bbbb::2
AAAA	IN	AAAA	aaaa:bbbb::5
AAAA	IN	AAAA	aaaa:bbbb::6
AAAA	IN	AAAA	aaaa:bbbb::10
AAAA	IN	AAAA	aaaa:bbbb::11

; CNAME Records
ftp	IN	CNAME	services.example.com.
www	IN	CNAME	services.example.com.

; PTR Records

; TXT Records

; SRV Records

; SPF Records

; URI Records

