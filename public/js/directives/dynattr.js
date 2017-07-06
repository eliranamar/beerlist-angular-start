app.directive('myStar', function() {
    return {
        scope: { list: '=dynAttr' },
        link: function(scope, elem, attrs){
            for(attr in scope.list){
                elem.children().attr(scope.list[attr].attr, scope.list[attr].value);   
            }
            //console.log(scope.list);           
        },
         template: '<star-rating-comp label-position="bottom" ' +
						 'label-text="RateBeer" show-hover-stars="true" show-half-stars="true" ' +
						 '></star-rating-comp>"'
    };
});