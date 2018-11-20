import { ObjectID } from 'mongodb';
import url from 'url';
import settings from '../../lib/settings';
import { db } from '../../lib/mongo';
import utils from '../../lib/utils';
import parse from '../../lib/parse';
import SettingsService from '../settings/settings';
import fetch from 'node-fetch';
import path from 'path';
import fse from 'fs-extra';
var XMLParser = require('react-xml-parser');
var parser = require('xml2json');



class ImporterService {

	constructor() { }

	async importFromOuterAPI(params = {}) {
		let outerApiUrl = ' http://www.sedaford.com/blgislm/fordparca.xml';//params.url;

		fetch(outerApiUrl).then(response => response.text())
			.then(xmlStr => {

				var currentdate = new Date(); 
				var datetimeStart = currentdate.getDate() + "/"
								+ (currentdate.getMonth()+1)  + "/" 
								+ currentdate.getFullYear() + " @ "  
								+ currentdate.getHours() + ":"  
								+ currentdate.getMinutes() + ":" 
								+ currentdate.getSeconds();

				var datetimeEnd = currentdate.getDate() + "/"
								+ (currentdate.getMonth()+2)  + "/" 
								+ currentdate.getFullYear() + " @ "  
								+ currentdate.getHours() + ":"  
								+ currentdate.getMinutes() + ":" 
								+ currentdate.getSeconds();

				var product_description = 'ÜRÜN - TESLİMAT BİLGİLERİ\
										  Kargo Hariç olan ürünlerimizde Türkiye nin her yerine en uygun fiyatlarda göndermekteyiz.\
										  Yayınlanan görseller ürünün gerçek resmidir.\
										  Siparişleriniz stok durumuna göre 1 - 2 iş günü içerisinde kargoya teslim edilecektir.\
										  Aksi bir durumda telefon veya mesaj ile irtibata geçilecektir.\
										  Satın almış olduğunuz tüm ürünler faturası ile gönderilir.\
										  Elektronik ürünlerde takılıp sökülmüş ürünlerin iadesi yapılmamaktadır.\
										  Birden fazla alımlarda, siparişleriniz tek kargo ile gönderilir.\
										  Anlaşmalı kargo şirketi Aras ve Sürat kargo olup firmamız önceden haber vermeksizin değiştirme hakkını saklı tutar.\
										  Ürün ve kargo ile ilgili tüm sorularınıza iletişim kanallarımızdan hızlıca cevap verilecektir. \n\
										  Ürünün aracınıza uygun olup olamdığından emin olmak için\
										  aracınızın ŞASE numarasını;\n\
										  0542 489 39 10 numaralı WhatsApp Hattımıza yazabilir ya da\
										  0850 885 01 85 numaralı Destek Hattımıza ulaşabilirsiniz.';								
				
				var json = parser.toJson(xmlStr);

				JSON.parse(json).fordparca.item.forEach(function (item) {

					var regualPrice = parseFloat(item.FIYAT) - ((parseFloat(item.FIYAT)/100) * 10);

					db.collection('productCategories').findOne({'name':item.KATEGORI}, {_id: 1 })
					.then(function(category) {
						try{
								if(category !== null && category !== undefined){

									db.collection('products').findOne({'sku':item.STOKKODU }, {_id: 1 })
									.then(function(product) {

										var tslug = ImporterService.ToSeoUrl(item.STOKADI);
										if(product !== null && product !== undefined){
											db.collection('products').updateOne(
												{_id: product._id},
												{
													$set: {
														name:  item.STOKADI,
														slug: tslug,
														category_id: category._id,
														regular_price: regualPrice,
														cost_price:regualPrice,
														sale_price: item.FIYAT,
														stock_quantity: 1,
														enabled: true,
														discontinued: false,
														oem:item.OEMKODU,
														stock_quantity: item.STOKDURUMU == "VAR" ?  1 : 0,
														sku: item.STOKKODU,
														stock_tracking: true,
														stock_preorder:true,
														stock_backorder:true,
														date_sale_from:datetimeStart,
														date_sale_to:datetimeEnd,
														quantity_inc:1,
														quantity_min:1,
														weight:1,
														discontinued:false,
														enabled:true,
														date_created:currentdate,
														date_updated:currentdate,
														description:product_description,
														attributes: [
															{ name: 'Marka', value: 'SedaSan' }
														],
														images: [
															{ filename: item.STOKKODU + ".jpeg", _id: new ObjectID(), alt:'', position:99 }
														]
													}
												},
												{multi: false}
											, function (err, result) {
												if(err){
													console.log(err);
												}
												else {
													var sourceFile = "theme/assets/images/urunresimleri/"+ item.STOKKODU + ".jpeg";
													var targetFile = "public/content/images/products/" + product._id+"/"+ item.STOKKODU + ".jpeg";

													const uploadDir = path.resolve(
														'public/content/images/products/' + product._id
													);
													fse.ensureDirSync(uploadDir);
													fse.copySync(path.resolve(sourceFile), path.resolve(targetFile));
												}
											});
										}
										else
										{											
											db.collection('products').insertOne({
												name:  item.STOKADI,
												slug: tslug,
												category_id: category._id,
												regular_price: regualPrice,
												cost_price:regualPrice,
												sale_price: item.FIYAT,
												stock_quantity: 1,
												enabled: true,
												discontinued: false,
												oem:item.OEMKODU,
												stock_quantity: item.STOKDURUMU == "VAR" ?  1 : 0,
												sku: item.STOKKODU,
												stock_tracking: true,
												stock_preorder:true,
												stock_backorder:true,
												date_sale_from:datetimeStart,
												date_sale_to:datetimeEnd,
												quantity_inc:1,
												quantity_min:1,
												weight:1,
												discontinued:false,
												enabled:true,
												date_created:currentdate,
												date_updated:currentdate,
												description:product_description,
												attributes: [
													{ name: 'Marka', value: 'SedaSan' }
												],
												images: [
													{ filename: item.STOKKODU + ".jpeg", _id: new ObjectID(), alt:'', position:99 }
												]
											}, (err, result) => {
												if(err){
													console.log(err);
												}
												else {
													var sourceFile = "theme/assets/images/urunresimleri/"+ item.STOKKODU + ".jpeg";
													var targetFile = "public/content/images/products/" + product._id+"/"+ item.STOKKODU + ".jpeg";

													const uploadDir = path.resolve(
														'public/content/images/products/' + product._id
													);
													fse.ensureDirSync(uploadDir);
													fse.copySync(path.resolve(sourceFile), path.resolve(targetFile));
												}
											});
									}
								})
							}
					}
					catch(err){
								console.log(err.message);
							}
						}
					)
				});

			})
			.catch(error => {
				console.log(error);
			});





			console.log('- Added products from Outer API');

		return true;
	}

	static ToSeoUrl(textString) {
 
		textString = textString.replace(/ /g, "-");
		textString = textString.replace(/</g, "");
		textString = textString.replace(/>/g, "");
		textString = textString.replace(/"/g, "");
		textString = textString.replace(/é/g, "");
		textString = textString.replace(/!/g, "");
		textString = textString.replace(/'/, "");
		textString = textString.replace(/£/, "");
		textString = textString.replace(/^/, "");
		textString = textString.replace(/#/, "");
		textString = textString.replace(/$/, "");
		textString = textString.replace(/\+/g, "");
		textString = textString.replace(/%/g, "");
		textString = textString.replace(/½/g, "");
		textString = textString.replace(/&/g, "");
		textString = textString.replace(/\//g, "");
		textString = textString.replace(/{/g, "");
		textString = textString.replace(/\(/g, "");
		textString = textString.replace(/\[/g, "");
		textString = textString.replace(/\)/g, "");
		textString = textString.replace(/]/g, "");
		textString = textString.replace(/=/g, "");
		textString = textString.replace(/}/g, "");
		textString = textString.replace(/\?/g, "");
		textString = textString.replace(/\*/g, "");
		textString = textString.replace(/@/g, "");
		textString = textString.replace(/€/g, "");
		textString = textString.replace(/~/g, "");
		textString = textString.replace(/æ/g, "");
		textString = textString.replace(/ß/g, "");
		textString = textString.replace(/;/g, "");
		textString = textString.replace(/,/g, "");
		textString = textString.replace(/`/g, "");
		textString = textString.replace(/|/g, "");
		textString = textString.replace(/\./g, "");
		textString = textString.replace(/:/g, "");
		textString = textString.replace(/İ/g, "i");
		textString = textString.replace(/I/g, "i");
		textString = textString.replace(/ı/g, "i");
		textString = textString.replace(/ğ/g, "g");
		textString = textString.replace(/Ğ/g, "g");
		textString = textString.replace(/ü/g, "u");
		textString = textString.replace(/Ü/g, "u");
		textString = textString.replace(/ş/g, "s");
		textString = textString.replace(/Ş/g, "s");
		textString = textString.replace(/ö/g, "o");
		textString = textString.replace(/Ö/g, "o");
		textString = textString.replace(/ç/g, "c");
		textString = textString.replace(/Ç/g, "c");
		textString = textString.replace(/--/g, "-");
		textString = textString.replace(/---/g, "-");
		textString = textString.replace(/----/g, "-");
		textString = textString.replace(/----/g, "-");
		
		return textString.toLowerCase();
	   }
    
}

export default new ImporterService();
