var ySpeed = function() {

    this.possibleMatches = [/\b\d+\s*kmh\b/ig, /\b\d+\s*mp\/h\b/ig, /\b\d+\s*nmph\b/ig, /\b\d+\s*kn\b/ig, /\b\d+\s*knot\b/ig, 
        /\b\d+\s*km\/h\b/ig, /\b\d+\s*mph\b/ig, /\b\d+\s*knots\b/ig];   

    // converts all values
    // val = value to convert
    // m = measure
    this.convert = function(val, m) {
        if(isNaN(val) || val=="" || val<0) return false;

        switch(m) {
            case 'km/h':
                var kmh = val;
                var mph = Math.round(val * 0.621 * 10) / 10;
                var knots = Math.round(val * 0.54 * 10) / 10;
            break;

            case 'mph':
                var mph = val;
                var kmh = Math.round(val * 1.609 * 10) / 10;
                var knots = Math.round(val * 0.869 * 10) / 10;
            break;

            case 'knots':
                var knots = val;
                var kmh = Math.round(val * 1.852 * 10) / 10;
                var mph = Math.round(val * 1.151 * 10) / 10;
            break;
        }

        return [kmh, mph, knots];
    };

    // normalizes pattern entered like X KNOTs, Y KM/H etc into a measure
    // like kmh, mph, knot
    // will also extract the number and return it too
    this.normalize = function(m) {
        measure = '';

        // km/h
        var matches = [this.possibleMatches[0], this.possibleMatches[5]];
        for(var k=0; k<matches.length; k++) {           
            if(matches[k].test(m)) {                
                var num = parseFloat(m);                
                return [num, 'km/h'];
            }
        }

        // mph
        var matches = [this.possibleMatches[1], this.possibleMatches[6]];
        for(var k=0; k<matches.length; k++) {
            if(matches[k].test(m)) {                
                var num = parseFloat(m);                
                return [num, 'mph'];
            }
        }

        // knots
        var matches = [this.possibleMatches[2], this.possibleMatches[3], this.possibleMatches[4], this.possibleMatches[7]];
        for(var k=0; k<matches.length; k++) {           
            if(matches[k].test(m)) {
                var num = parseFloat(m);                
                return [num, 'knots'];
            }
        }

        return [0,measure];
    };

    // parses text
    // txt  - text to parse
    // measures - array of all units we want to convert to
    this.parseText = function(html) {
        var numPossibleMatches = this.possibleMatches.length;       
        var finalHTML = html;

        for(var i=0; i < numPossibleMatches; i++) {
            var pattern = this.possibleMatches[i];
            var matches = html.match(pattern);
            if(!matches) continue;

            var numMatches = matches.length;    

            for(var j=0; j<numMatches; j++) {
                // extract measure of this match
                result = this.normalize(matches[j]);            

                // now replace the match in the text with:
                // 1) text with proper measure
                // 2) text in braces adding the other required measures
                var braces = " (";
                var vals = this.convert(result[0], result[1]);
                switch(result[1]) {
                    case 'km/h': // we have it in km/h                       
                        braces += vals[1]+' mph / '+ vals[2]+' knots';                      
                    break;  
                    case 'mph': // we have it in mph                    
                        braces += vals[0]+' km/h/ ' + vals[2]+' knots';                     
                    break;  
                    case 'knots':   // we have it in knots                  
                        braces += vals[0]+' km/h / '+ vals[1]+' mph';                       
                    break;
                }   
                braces += ")";
                var replacement = result[0]+' '+result[1] + braces;             
                finalHTML = finalHTML.replace(matches[j], replacement);             
            }
        } 

        return finalHTML;
    }
}