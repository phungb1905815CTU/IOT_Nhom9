var inputProductSony = document.getElementById('inputProductSony');
var outputProductSony = document.getElementById('outputProductSony');
var btn__inputProduct = document.querySelector('.btn__inputProductSony');
var btn__outputProduct = document.querySelector('.btn__outputProductSony');
var formInputProduct = document.querySelector('.form__inputProduct');
var formOutputProduct = document.querySelector('.form__outputProduct');

var Count_ImportProduct_Sony = 0;
var SumCount_ImportProduct = 0;

var API_ImportProduct_Sony = `https://api.thingspeak.com/channels/1976873/feeds.json?results=1000`;

const fetch_API_ImportProduct__Sony = async (url) => {
    const data_ImportProduct_Sony = await axios.get(url);
    data_ImportProduct_Sony.data.feeds.forEach(value => {
        Count_ImportProduct_Sony += Number(value.field1);
    })
    SumCount_ImportProduct += Number(Count_ImportProduct_Sony);
}

formInputProduct.addEventListener('submit',async (event) => {
    event.preventDefault();
    const nhaphangSony = ` https://api.thingspeak.com/update?api_key=0ZQAACCZOWN0KIHS&field1=${inputProductSony.value}`;
    if(Number(inputProductSony.value) > 0) {
        const data = await axios.get(nhaphangSony);
        alert('Nhập hàng thành công');
        window.location.reload();
    } else {
        alert('Số lượng nhập không hợp lệ. Vui lòng nhập lại');
    }
    inputProductSony.value = '';
});

formOutputProduct.addEventListener('submit',async (event) => {
    event.preventDefault();
    const xuathangSony = `https://api.thingspeak.com/update?api_key=5BA1182GAYSXGEWD&field1=${outputProductSony.value}`;
    if(Number(outputProductSony.value) > 0) {
        if(typeof SumCount_ImportProduct === 'number' && SumCount_ImportProduct != null) {
            console.log(`SumCount_ImportProduct = ${SumCount_ImportProduct}`);
            console.log(`outputProductSony = ${outputProductSony.value}`);
            if(Number(SumCount_ImportProduct-outputProductSony.value)>0) {
                const data = await axios.get(xuathangSony);
                alert('Xuất sản phẩm thành công');
                window.location.reload();
            } else {
                alert('Sản phẩm xuất không thể lớn hơn sản phẩm có. Vui lòng nhập lại');
            }
        } else {
            alert('Xuất sản phẩm không hợp lệ. Vui lòng nhập lại');
        }
    }
    outputProductSony.value = '';
});

window.addEventListener('load',async (event) => {
    await fetch_API_ImportProduct__Sony(API_ImportProduct_Sony);

})