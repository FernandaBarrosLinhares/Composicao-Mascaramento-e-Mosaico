//Coomposição, mascaramento e mosaico de imagens

//Cores verdadeiras
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3}; 

//Exibindo coleções de imagens:
//Exibir imagens de 2016, Landsat, utilizando o visParams já definido.
var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA');
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');
Map.addLayer(landsat2016, visParams, 'Coleção Landsat 8');

//Composiçã com mediana
//Obter a mediana ao longo do tempo, em cada banda e em cada pixel.
var mediana = landsat2016.median();
Map.addLayer( mediana, visParams, 'mediana')

//Mascarar ou mascaramento de image
var hansenImage = ee.Image("UMD/hansen/global_forest_change_2024_v1_12");
var dadoMascarado = hansenImage.select('datamask');
var mascara = dadoMascarado.eq(1);

//Atualizar a composiçao com a mascara de agua
var mascaraComposicao = mediana.updateMask(mascara);
Map.addLayer(mascaraComposicao, visParams, 'Máscara')

//Mosaicos
var agua = mascara.not();
agua = agua.mask(agua);

var mosaicoFinal = ee.ImageCollection([mediana.visualize(visParams), agua.visualize({palette:'000044'}),]).mosaic();
Map.addLayer(mosaicoFinal, {}, 'Mosaico exemplo aula');
