
  var request = require('request');

  var options = {
      url: 'http://172.17.0.1/570/m570_status.htm',
      auth: {
          'user': 'comtech',
          'pass': 'C0mt3ch911'
      }
  };

  function writeToFile(fileName, path, data, append){
    fs = require('fs');
    if (append) {
      fs.appendFile(path+fileName, data, function (err) {
      if (err) throw err;
        console.log('Updated!');
      });
    }else {
      fs.writeFile(path+fileName, data, function (err) {
        if (err) throw err;
        console.log('Replaced!');
      });
    }
  }

  function genFileName(){
    let dateObj = new Date();
    let fileName = ('0'+String(dateObj.getUTCMonth()+1)).slice(-2)+String(dateObj.getUTCFullYear());
    return fileName+'.csv';
  }

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const cheerio = require('cheerio');
        let $ = cheerio.load(body);
        // Receive Signal Level (dBm): MR3_99
        // Eb/No (dB)
        // Modem Temperature (deg C)
        // BUC Temperature (deg C)
        let CircuitID = $('input[name="C8_15"]')[0].attribs.value.trim();
        let SerialNumber = $('input[name="MR3_20"]')[0].attribs.value;
        let SoftwareRevision = $('input[name="MR3_3"]')[0].attribs.value;
        let RemoteLocal = $('input[name="MR3_25"]')[0].attribs.value;
        let EventsLogUnreadLines = $('input[name="MR4_3"]')[0].attribs.value;
        let StatisticsLogUnreadLines = $('input[name="MR4_7"]')[0].attribs.value;
        let EbNoRemoteDemodulator = $('input[name="MR3_7"]')[0].attribs.value;
        let TxPowerLevelIncrease = $('input[name="C7_600"]')[0].attribs.value;
        let TxCarrier = $('input[name="C7_80"]')[0].attribs.value;
        let ModemTemperature = $('input[name="MR3_21"]')[0].attribs.value;
        let BUCTemperature = $('input[name="BUC58"]')[0].attribs.value;
        let UnitStatus = $('input[name="MR3_26"]')[0].attribs.value;
        let RxStatus = $('input[name="MR3_28"]')[0].attribs.value;
        let TxStatus = $('input[name="MR3_27"]')[0].attribs.value;
        let ODUStatus = $('input[name="MR3_29"]')[0].attribs.value;
        let LNBStatus = $('input[name="MR3_30"]')[0].attribs.value;
        let EbNo = $('input[name="WF064"]')[0].attribs.value;
        let FreqOffset = $('input[name="MR3_14"]')[0].attribs.value;
        let BER = $('input[name="MR3_19"]')[0].attribs.value;
        let Redundancy = $('input[name="MR3_17"]')[0].attribs.value;
        let RxSignalLevel = $('input[name="MR3_99"]')[0].attribs.value;
        let LNBCurrent = $('input[name="B1_6"]')[0].attribs.value;
        let now = new Date();
        let dateTime = now.toISOString();
        let dataStream = dateTime+','+CircuitID+','+SerialNumber+','+SoftwareRevision+','+RemoteLocal+','+EventsLogUnreadLines+','+StatisticsLogUnreadLines+','+EbNoRemoteDemodulator+','+TxPowerLevelIncrease+','+TxCarrier+','+ModemTemperature+','+BUCTemperature+','+UnitStatus+','+RxStatus+','+TxStatus+','+ODUStatus+','+LNBStatus+','+EbNo+','+FreqOffset+','+BER+','+Redundancy+','+RxSignalLevel+','+LNBCurrent+'\n';

        writeToFile(genFileName(),'./',dataStream,'1');
       // console.log(RxSignalLevel+"\n");
       // console.log(CircuitID+"\n");
      }
  }

request(options, callback);





// then use $('.objectModifier') to select
