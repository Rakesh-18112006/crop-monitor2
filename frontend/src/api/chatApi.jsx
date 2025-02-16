import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

const getChatList = (userId) => axios.get(`${API_URL}/list/${userId}`);

const getChatMessages = (
                          productId,
                          buyerId,
                          farmerId
                          
                        ) => axios.get(`${API_URL}/${productId}/${buyerId}/${farmerId}`);

const sendMessage = (
                         buyerId,
                         farmerId,
                         productId,
                         senderId,
                         message
                         
                    ) =>
  axios.post(`${API_URL}/send`, { buyerId, farmerId, productId, senderId, message });

const getFarmerDetails = (farmerId) => axios.get(`http://localhost:5000/api/farmer/${farmerId}`);

export default { getChatList, getChatMessages, sendMessage, getFarmerDetails };
