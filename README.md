
# EcoTrade

EcoTrade is a simple and efficient web application for a recycling company, enabling users to request a mobile seller for scrap collection or participate in online auctions for recycled materials. The platform promotes sustainability by making it easy for users to dispose of and bid on materials in an eco-friendly way.

## Features

- **User Authentication**: Register and log in to manage your profile.
- **Request a Mobile Seller**: Users can request a mobile seller to pick up scrap materials for recycling.
- **Participate in Auctions**: Bid on available recycled materials in an online auction format.
- **User-Friendly Interface**: Simple and intuitive interface for smooth user experience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/EcoTrade.git
   ```

2. Navigate to the project folder:
   ```bash
   cd EcoTrade
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

5. Configure your `.env` file in the `server` directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

6. Start the server and client:
   - Server:
     ```bash
     npm start
     ```
   - Client:
     ```bash
     npm start
     ```

7. Open `http://localhost:3000` in your browser to view the app.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Usage

- **Register/Login**: Access the platform by creating an account or logging in.
- **Request Mobile Seller**: Use the form to submit a request for scrap collection.
- **Auctions**: Browse and bid on auction items from recycled materials.

## License

This project is licensed under the MIT License.
