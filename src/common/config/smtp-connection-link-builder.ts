export class SmtpConnectionLinkBuilder {
    private protocol: string;
    private hostname: string;
    private port: string | number;
    private username: string;
    private password: string;

    setProtocol(protocol: string) {
        this.protocol = protocol;
        return this;
    }

    setHost(hostname: string) {
        this.hostname = hostname;
        return this;
    }

    setPort(port: number | string) {
        this.port = port;
        return this;
    }

    setUsername(username: string) {
        this.username = username;
        return this;
    }

    setPassword(password: string) {
        this.password = password;
        return this;
    }

    build() {
        return `${this.protocol}://${this.username}:${this.password}@${this.hostname}:${this.port}`;
    }
}
