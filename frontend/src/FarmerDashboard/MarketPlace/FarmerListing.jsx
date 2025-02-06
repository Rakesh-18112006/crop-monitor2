// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FarmerMarketplaceNavbar from "./FarmerMarketplaceNavbar";

import Coming from "../../ComingSoon/Coming";
import FarmerMarketplaceNavbar from "./FarmerMarketplaceNavbar";

// const FarmerListing = ({ user }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products uploaded by the logged-in farmer
//     axios
//       .get("http://localhost:5000/api/products/all", {
//         params: { sellerId: user.uid }, // Fetch only the products uploaded by this farmer
//       })
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, [user]);

//   return (
//     <>
//       <FarmerMarketplaceNavbar />
//       <div className="p-6 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold mb-4 text-center">Your Uploaded Products</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.length === 0 ? (
//             <p className="text-center text-gray-600">No products found. Start uploading now!</p>
//           ) : (
//             products.map((product) => (
//               <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-40 object-cover rounded"
//                 />
//                 <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="font-bold text-green-700">₹{product.price}</p>
//                 <p className="text-sm text-gray-500">Category: {product.category}</p>
//                 <p className="text-sm text-gray-500">Location: {product.location}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FarmerListing;

const FarmerListing = () => {
    return (
        <>
        <FarmerMarketplaceNavbar />
            <Coming />
            </>
    );
}

export default FarmerListing;