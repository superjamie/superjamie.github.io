---
title: Caddy container with DNS provider
---

I've been using [Caddy](https://caddyserver.com/) as a reverse proxy for a while. It's very well documented and easy to configure.

Gone are the days of figuring out HTTPS and paying for a certificate, many webservers and proxies offer an automated TLS certificate via Let's Encrypt automated challenges. Getting a valid TLS certificate is just one line in a config file.

The default way to do this is with a "HTTP Challenge" where the webserver must listen on port 80, and the provider makes sure the webserver asking for the certificate is the webserver at the domain.

I want to move to Wildcard domains, which requires a "DNS Challenge", where the webserver contacts the DNS provider via an API.

Caddy implements this as additional modules, however modules cannot be dynamically loaded, you need to either [download a Caddy binary from the build service, or build Caddy yourself](https://caddyserver.com/download?package=github.com%2Fcaddy-dns%2Fcloudflare).

This wasn't very appealing to me, I just want a container that works.

Luckily, I found the [Caddy Gateway Containerfile](https://github.com/caddyserver/gateway/blob/master/caddy.Containerfile) which shows an example of an automated build and copy into the regular Caddy container.

I modified this a little for my needs:

```
ARG CADDY_VERSION=2

FROM docker.io/library/caddy:${CADDY_VERSION}-builder AS builder

RUN XCADDY_SETCAP=0 XCADDY_SUDO=0 xcaddy build \
    --with github.com/caddy-dns/cloudflare

FROM docker.io/library/caddy:${CADDY_VERSION}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
```

Now I can `podman build .` and I get a new image at the end of it:

```
[2/2] STEP 2/2: COPY --from=builder /usr/bin/caddy /usr/bin/caddy
[2/2] COMMIT
--> 4d7a6ac83a0
4d7a6ac83a0783425c0b569684190c8233a484374ddb1fa24239903e01e1bf48
```

I can give this a tag:

```
$ podman image tag 4d7a6ac83a07 caddy-cloudflare:latest
```

Done! I now have the regular Caddy image with the built binary in it.

Any time the base container updates, I can just rebuild it and continue like normal.

