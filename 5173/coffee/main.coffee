# author by lichaosoft.net
$(()->

    wantGold = 450 #可以接受的金价 1元购入450以上金


    #格式化金价以及买金按钮到一个数据对象
    customGoldData = (goldEl, buyBtnEl)->
        regexpRets = (new RegExp('=(.+)')).exec(goldEl.html())
        {gold: regexpRets[1], buyBtnEl: buyBtnEl}


    #获取当前列表中1元可以购买的最多的金的买金按钮
    getMaxGold = ->
        sortGolds = []
        sortGolds.push(customGoldData($('.pdlist_unitprice b', row), $('.btnlink_o_s_small', row))) for row in $('.sin_pdlbox')
        sortGolds.sort (a,b)-> b.gold-a.gold    #做一下排序
        sortGolds[0]

    
    maxGold = getMaxGold()  #获取当前1元可以购买的最多的金的买金按钮


    #当前列表中最好的金价，大于可以接受的金价
    if maxGold.gold > wantGold

        if confirm "现价1元可以购买:#{maxGold.gold}金，请问是否买入？"
            chrome.runtime.sendMessage({
                type: 'OPEN_TAB', 
                url: maxGold.buyBtnEl.attr('href')
            }, (resp)->
                #alert resp.msg
            )
        else
            location.href = location.href       #点击否，则忽略此次价格，立即刷新页面列表
    else
        setTimeout(->
            location.href = location.href
        , 2000)                                 #当前列表的最多金的金价，低于期望金价，则延迟两秒后刷新页面
)
