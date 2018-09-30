var soap = require('soap');
var url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';
var args = {
    theCityName: '杭州'
};
var soaptest = function () {
    soap.createClient(url, function (err, client) {
        client.getWeatherbyCityName(args, function (err, result) {
            console.log(result);
        });
    });
}
soaptest();