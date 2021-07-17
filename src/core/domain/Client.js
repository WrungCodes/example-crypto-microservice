class Client
{
    constructor( name, uuid, email, api_key, ip, webhook_url, client_type, is_active )
    {
        this.name = name
        this.uuid = uuid
        this.email = email
        this.api_key = api_key
        this.ip = ip
        this.webhook_url = webhook_url
        this.client_type = client_type
        this.is_active = is_active
    }

    toObject()
    {
        return {
            name: this.name,
            uuid: this.uuid,
            email: this.email,
            api_key: this.api_key,
            ip: this.ip,
            webhook_url: this.webhook_url,
            client_type: this.client_type,
            is_active: this.is_active
        }
    }

    toName()
    {
        return 'client'
    }
}

module.exports = Client;