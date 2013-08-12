# author by lichaosoft.net
# test ssh key
$(()->

    wantGold = 420 #可以接受的金价 1元购入450以上金

    playCatAudio = ->
        $(document.body).remove('audio')
        $(document.body).append('<audio src="http://lichaosoft.net/res/cat.ogg" autoplay="autoplay"></audio')


    buyLinks = new BuyLinks


    #格式化金价以及买金按钮到一个数据对象
    customGoldData = (goldEl, buyLink)->
        regexpRets = (new RegExp('=(.+)')).exec(goldEl.html())
        {gold: regexpRets[1], buyLink: buyLink}


    #获取当前列表中1元可以购买的最多的金的买金按钮
    getMaxGold = ->
        sortGolds = []
        sortGolds.push(customGoldData($('.pdlist_unitprice b', row), $('.btnlink_o_s_small', row).attr('href'))) for row in $('.sin_pdlbox')
        sortGolds.sort (a,b)-> b.gold-a.gold    #做一下排序


        sortGolds = sortGolds.filter (gold) ->
            gold.gold > wantGold



        sortGolds = sortGolds.filter (gold) ->
            console.log "价格:#{gold.gold}, 因非寄售类型忽略购买链接: #{gold.buyLink}" if ! ( new RegExp('Consignment$').test(gold.buyLink) )
            ( new RegExp('Consignment$').test(gold.buyLink) )


            
        sortGolds = sortGolds.filter (gold) ->
            console.log("价格:#{gold.gold}, 因已购买或之前选择取消购买，忽略购买链接: #{gold.buyLink}") if buyLinks.exist(gold.buyLink)
            !buyLinks.exist(gold.buyLink)

            
        sortGolds[0]

    
    maxGold = getMaxGold()  #获取当前1元可以购买的最多的金的买金按钮


    #当前列表中最好的金价，大于可以接受的金价
    if maxGold

        playCatAudio()
        setTimeout( ->
            if confirm "现价1元可以购买:#{maxGold.gold}金，请问是否买入？"
                buyLinks.write(maxGold.buyLink)
                chrome.runtime.sendMessage({
                    type: 'OPEN_TAB', 
                    url: maxGold.buyLink 
                }, (resp)->
                    #alert resp.msg
                )
            else
                buyLinks.write(maxGold.buyLink)

                setTimeout ->
                    location.href = location.href       #点击否，则忽略此次价格，立即刷新页面列表
        , 1000)
    else
        setTimeout(->
            location.href = location.href
        , 2000)                                 #当前列表的最多金的金价，低于期望金价，则延迟两秒后刷新页面
)
