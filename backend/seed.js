import bcrypt from "bcryptjs";
import "colors";
import Item from "./models/Item.js";
import User from "./models/User.js";

const mongoURI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fullstack_app";

const dummyItems = [
    {
        name: "Premium Headphones",
        description:
            "High-quality wireless headphones with noise cancellation.",
        price: 299.99,
        imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    },
    {
        name: "Smart Watch",
        description:
            "Feature-rich smartwatch with health tracking and notifications.",
        price: 199.99,
        imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    },
    {
        name: "Mechanical Keyboard",
        description: "Ergonomic mechanical keyboard with custom RGB lighting.",
        price: 149.99,
        imageUrl:
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60",
    },
];

const seedData = async () => {
    try {
        // await mongoose.connect(mongoURI);
        console.log("MongoDB connected for seeding.".cyan.underline);

        // Clear existing data
        await User.deleteMany();
        await Item.deleteMany();
        console.log("Cleared existing users and items.".red.inverse);

        // Create a dummy user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        await User.create({
            username: "testuser",
            email: "test@example.com",
            password: hashedPassword,
        });
        console.log(
            "Created dummy user: test@example.com / password123".green.inverse,
        );

        // Create dummy items
        await Item.insertMany(dummyItems);
        console.log("Inserted dummy items.".green.inverse);

        console.log("Seeding completed successfully!".green.bold);
        process.exit(0);
    } catch (error) {
        console.error(`Error during seeding: ${error.message}`.red.bold);
        process.exit(1);
    }
};

export default seedData;
