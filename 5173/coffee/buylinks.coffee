class BuyLinks
    
    constructor: ->
        @BUY_LINK_KEY = 'BUY_LINKS'
        @load()

    load: ->
        if localStorage.getItem(@BUY_LINK_KEY)
            try
                @buyLinks = JSON.parse(localStorage.getItem(@BUY_LINK_KEY))
            catch ex
                alert ex
                @buyLinks = []
        else
            @buyLinks = []

    save: ->
        localStorage.setItem(@BUY_LINK_KEY, JSON.stringify(@buyLinks))



    write: (url) ->
        @buyLinks.push(url)
        @save()

    exist: (url) ->
        @buyLinks.indexOf(url) isnt -1

this.BuyLinks = BuyLinks
