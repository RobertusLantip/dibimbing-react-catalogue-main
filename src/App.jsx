import { useEffect, useState } from "react";

/* Daftar Tugas Anda */
/*
  1. Tampilkan seluruh data Product dari API dummyJson (URL API ada dibawah)
  2. Buat tampilan katalog product seperti desain UI yg telah dibuat (URL Desain User Interface ada di bawah)
  3. Pastikan tampilan web responsive (aman di semua device)
  4. Terapkan pagination seperti di desain UI pada katalog product
  5. Buat input text di atas katalog product untuk melakukan pencarian product
  6. Buat beberapa button/dropdown untuk list Category di atas katalog Product, 
    jika di klik maka katalog product dengan category terpilih saja yg tampil
  7. Buat button/dropdown untuk melakukan sorting katalog product
  8. [Optional] buat animasi skeleton card ketika data product sedang di load
  9. [Optional] buat animasi ketika card katalog product di hover seperti di desain UI
*/

/* Rules */
/*
  1. wajib menyalakan kamera
  2. wajib sharescreen ketika sedang mengerjakan
  3. diperbolehkan untuk melakukan pencarian di internet, kecuali tools AI
  4. tidak diperkenankan berdiskusi, hanya boleh bertanya seputar tugas
  5. waktu pengerjaan hanya 50 menit, dimulai dari kandidat mulai mengerjakan
*/

/* URL Dokumentasi API : https://dummyjson.com/docs/products */
/* URL Desain User Interface : https://cdn.dribbble.com/userupload/10414553/file/original-2d905d116a30699e9bb1bf0e30df9ac2.png?resize=752x3593&vertical=center */

export default function App() {
  const [productData, setProductData] = useState([]);

  const getProductData = async () => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((result) => {
      setProductData(result.products)
    });
  }

  console.log({ productData })

  useEffect(() => {
    getProductData();
    return () => {}
  }, [])

  return (
    <main>
      <h1 className="text-2xl font-semibold">Hello World</h1>
      <section className="space-y-3 px-10">
      {productData.map((item, index) => (
        <div key={index} className="border px-6 py-4 rounded">
          <h2 className="font-medium text-lg">{item.title}</h2>
          <h4>{item.description}</h4>
        </div>
      ))}
      </section>
    </main>
  )
}