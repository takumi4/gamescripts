
Configs = null
DefConfigss = {
    pages : [
        {
            url: 'http://s.5173.com/search/a36ead01453c40b584f8e1e687723f2d-5ootfk-1got2e-ymz55j-0-kb0ewi-0-0-0-a-a-a-a-a-0-itemprice_asc-0-0.shtml',
            gold: 450
        }
    ]
}


class Golder
    constructor: () ->
        @loadConfigs()

    loadConfigs: ->
        configStr = localStorage.getItem('config')
        Configs = JSON.parse(configStr) if configStr
        Configs = Configs ? DefConfigss

    render: ->
        fieldsetTmpFn = doT.template( $('#tmp-fieldset').html() )

        $('#stage').html fieldsetTmpFn(Configs)
    
    router: ->


$(->
    golder = new Golder
    golder.render()
)
