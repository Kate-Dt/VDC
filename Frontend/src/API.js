const API_URL = __dirname;

function backendGet(url, data, callback) {
    $.getJSON(url,data,callback);
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getRecipesList = function(request, callback) {
    backendGet(API_URL+"/api/get-recipes-list/",request, callback);
};

exports.getCategoriesList = function(callback){
    backendGet(API_URL+"/api/get-categories-list/",undefined, callback);
};