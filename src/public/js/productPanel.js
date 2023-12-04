let data;
let per_page = parseInt("{{ proData.per_page }}");
let page = parseInt("{{ proData.page }}");
let totalPage = parseInt("{{ proData.totalPage }}");
let products


const updatePro = () => {
    if (confirm("Save your product?") == true) {
        $('.detailForm').attr('action', `http://localhost:3000/product/update`)
        $('.detailForm').submit();
    }
}

const addPro = () => {
    if (confirm("Add new product?") == true) {
        $('.addForm').attr('action', `http://localhost:3000/product/add`)
        $('.addForm').submit();
    }
}

const removePro = () => {
    if (confirm("Remove product?") == true) {
        $('.detailForm').attr('action', `http://localhost:3000/product/remove`)
        $('.detailForm').submit();
    }
}




const detailProduct = async (id) => {
    $('.mssDetail').addClass('d-none');
    $('.detailForm').removeClass('d-none');
    $('#detail-tab-pane').addClass('show active')
    $('#add-tab-pane').removeClass('show active');
    $('#add-tab').removeClass('active');
    $('#detail-tab').addClass('active');
    let data = await fetch(`http://localhost:3000/product/ProID=${id}`);
    data = (await data.json())[0];
    $('.detailForm .detailItem img').attr('src', `/images/pid/${data.ProID}/main_thumbs.jpg`);
    $('.detailForm .detailItem [name="ProID"]').val(data.ProID);
    $('.detailForm .detailItem [name="ProName"]').val(data.ProName);
    $('.detailForm .detailItem [name="TinyDes"]').val(data.TinyDes);
    $('.detailForm .detailItem [name="FullDes"]').val(data.FullDes);
    $('.detailForm .detailItem [name="Price"]').val(data.Price);
    $('.detailForm .detailItem [name="Quantity"]').val(data.Quantity);
    $('.detailForm .detailItem [selected]').removeAttr('selected');
    $(`.detailForm .detailItem [value="${data.CatID}"]`).attr('selected', true);
}

const updateData = (data) => {
    per_page = parseInt(data.per_page);
    page = parseInt(data.page);
    totalPage = parseInt(data.totalPage);
    products = data.products;
}

$('.catDropDown').text("All");

const generateProduct = () => {
    $('.proList').empty();
    for (let product of products) {
        const html = `<div class="card me-auto ms-auto  proCard mt-3 mb-3" ProID="${product.ProID}"  style="width: 18rem;">
                                            <img src="/images/pid/${product.ProID}/main_thumbs.jpg" class="card-img-top"
                                                alt="/images/pid/${product.ProID}/main_thumbs.jpg">
                                            <div class="card-body d-flex flex-column align-content-between ">
                                                <h5 class="card-title">${product.ProName}</h5>
                                                <p class="card-text">${product.TinyDes}</p>
                                                <p class="card-text">${product.Price}vnđ</p>
                                            </div>
                </div>`
        const listItem = $(html)
        listItem.on('click', async function (e) {
            await detailProduct($(this).attr('ProID'));
        })
        $('.proList').append(listItem);
    }

}

const updatePagination = () => {
    $('.pagePerTotal').text(`${page}/${totalPage}`);
}

$('.dropdown-item').on("click", async function () {
    $('.catDropDown').text($(this).text());
    if ($(this).attr('CatID') == undefined) {
        data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=1`);
    } else {
        data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=1/CatID=${$(this).attr('CatID')}`);
    }
    data = await data.json();
    updateData(data);
    updatePagination();
    generateProduct();
})

$('.pre').on('click', async function (e) {
    if (page > 1) {
        if ($(this).attr('CatID') == undefined) {
            data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=${page - 1}`);
        } else {
            data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=${page - 1}/CatID=${$(this).attr('CatID')}`);
        }
        data = await data.json();
        updateData(data);
        updatePagination();
        generateProduct()
    } else {
        e.preventDefault();
    }
})

$('.next').on('click', async function (e) {
    if (page < totalPage) {
        if ($(this).attr('CatID') == undefined) {
            data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=${page + 1}`);
        } else {
            data = await fetch(`http://localhost:3000/product/per_page=${per_page}/page=${page + 1}/CatID=${$(this).attr('CatID')}`);
        }
        data = await data.json();
        updateData(data);
        updatePagination();
        generateProduct();
    } else {
        e.preventDefault();
    }
})

$('.proCard').on('click', async function (e) {
    await detailProduct($(this).attr('ProID'));
})
