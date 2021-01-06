(() => {

    /*
      {
        author:     'MonokaiJs',
        facebook:   'https://fb.me/MonokaiJsp',
        homepage:   'https://omfg.vn'
        // Please DO NOT REMOVE CREDITS IN THIS FILE.
      }
    */
    var friend_list = ['id']; //
    var postID = '2600588390015644';
    var token = "";
    var analyze_comments = (url) => {
            var r = new XMLHttpRequest;
            r.onreadystatechange = () => {
                if (r.readyState == 4 && r.status == 200) {
                    var retrieved_cmt_data = JSON.parse(r.responseText);
                    var comments = retrieved_cmt_data.data;
                    comments.forEach(comment => {
                        if (friend_list.includes(comment.from.id)) {
                            console.log(' ------------------------------','\n',comment.from.name + ' [' + comment.from.id + '] ('+comment.created_time+'): \n',comment.message,'\n','Link: https://facebook.com/' + comment.id,'\n','------------------------------');
                        }
                    });
                    if (typeof retrieved_cmt_data.paging.next !== 'undefined') {
                        analyze_comments(retrieved_cmt_data.paging.next);
                    }
                }
            }
            r.open('GET', url);
            r.send();
        };
    analyze_comments('https://graph.facebook.com/'+postID+'/comments?fields=from,message&access_token=' + token);
})();