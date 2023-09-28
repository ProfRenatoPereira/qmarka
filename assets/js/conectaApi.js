async function productsList (){
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products");
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
}

async function searchProducts(searchTerm) {
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products?q="+searchTerm);
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao: conexao.status };
}

async function searchProductById(productId) {
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products");
    const conexaoConvertida = await conexao.json();
    const produtoEncontrado = conexaoConvertida.find(products => products.id == productId);
    return { conexaoConvertida: produtoEncontrado, statusConexao: conexao.status };
}

async function insertProduct (image, name, description, price, promocionalPrice, seller, category, tag01, color01, color02, color03, size01, size02, size03, size04, size05){
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            product_image_desktop: image,
            product_image_tablet: image,
            product_image_mobile: image,
            product_label: name,
            product_description: description,
            product_price: price,
            product_promotional_price: promocionalPrice,
            seller_info: seller,
            category: category,
            tag01: tag01,
            color: [{name: color01},{name: color02},{name: color03}],
            size: [{name: size01},{name: size02},{name: size03},{name: size04},{name: size05}]
        })
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
}

async function editProduct (id, image, name, description, price, promocionalPrice, seller, category, tag01, color01, color02, color03, size01, size02, size03, size04, size05){
    console.log("Cá entrou: ")
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products/"+id, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            product_image_desktop: image,
            product_image_tablet: image,
            product_image_mobile: image,
            product_label: name,
            product_description: description,
            product_price: price,
            product_promotional_price: promocionalPrice,
            seller_info: seller,
            category: category,
            tag01: tag01,
            color: [{name: color01},{name: color02},{name: color03}],
            size: [{name: size01},{name: size02},{name: size03},{name: size04},{name: size05}]
        })
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
}

async function deleteProduct(productId) {
    const conexao = await fetch("https://alura-challenge-front-end-2.vercel.app/products/"+productId, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });
    const statusConexao = conexao.status;
    const conexaoConvertida = await conexao.json();
    return { conexaoConvertida, statusConexao };
}

export const conectApi = {
    productsList,
    searchProducts,
    searchProductById,
    insertProduct,
    editProduct,
    deleteProduct
}
