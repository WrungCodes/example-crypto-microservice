class Action
{
    constructor( name, slug, is_active, description )
    {
        this.name = name
        this.slug = slug
        this.is_active = is_active
        this.description = description
    }

    toObject()
    {
        return {
            name: this.name,
            slug: this.slug,
            is_active: this.is_active,
            description: this.description
        }
    }

    toName()
    {
        return 'action'
    }
}

module.exports = Action;