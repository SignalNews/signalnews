function hxlProxyToJSON(input){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==0){
            e.forEach(function(e2,i2){
                var parts = e2.split('+');
                var key = parts[0]
                if(parts.length>1){
                    var atts = parts.splice(1,parts.length);
                    atts.sort();                    
                    atts.forEach(function(att){
                        key +='+'+att
                    });
                }
                keys.push(key);
            });
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    init(output);
}

//load 3W data

let url = 'https://proxy.hxlstandard.org/data.json?strip-headers=on&url='+gSheetURL;

$.ajax({ 
    type: 'GET', 
    url: url, 
    dataType: 'json',
    success:function(response){
        hxlProxyToJSON(response);
    }
});