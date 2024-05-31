import React from 'react';
import styles from './FAQ.module.css'; // Assuming you have a corresponding CSS module for styling

const FAQ = () => {
    const faqs = [
        {
            question: "How do I register and login?",
            answer: "To register, click on the 'Sign Up' button on the homepage. Fill in the required details, such as your name, email, and password, and then click 'Submit'. To log in, click on the 'Login' button and enter your registered email and password."
        },
        {
            question: "How can I create an experience?",
            answer: "Once logged in, navigate to the 'Create Experience' section from the main menu. Fill in the experience title, description, geo-location (latitude and longitude), and upload an image. Click 'Submit' to create your experience."
        },
        {
            question: "How do I search for experiences by location?",
            answer: "Use the search bar on the homepage or the 'Search' section. Enter the location you're interested in and click the search icon. A list of experiences in that location will be displayed."
        },
        {
            question: "How can I search for experiences by keyword?",
            answer: "In the search bar, type the keywords related to the experience you're looking for (e.g., 'hiking', 'beach'). Press enter or click the search icon to see a list of matching experiences."
        },
        {
            question: "Where can I view search results?",
            answer: "After performing a search by location or keyword, the results will be displayed in a list format. You can scroll through the list to view the different experiences available."
        },
        {
            question: "How can I view an experience from the search results list?",
            answer: "Click on the title or image of any experience in the search results list. This will open the detailed view of the experience, where you can read the full description, see the geo-location, view images, and check the ratings."
        },
        {
            question: "How can I rate other users' experiences?",
            answer: "When viewing an experience, you will see an option to rate it. Select the number of stars you wish to give (from 1 to 5) and submit your rating."
        },
        {
            question: "What are trips, and how can I create one?",
            answer: "Trips are user-named collections of experiences. To create a trip, go to the 'My Trips' section, click on 'Create Trip', enter a trip name, and save it."
        },
        {
            question: "How can I add experiences to my trips?",
            answer: "While viewing an experience, you will see an option to 'Add to Trip'. Select the trip you want to add the experience to from the dropdown menu."
        },
        {
            question: "How do I manage my trips?",
            answer: "In the 'My Trips' section, you can view all your trips. Click on a trip to view the experiences added to it. You can also edit the trip name or delete the trip entirely."
        },
        {
            question: "What information do experiences include?",
            answer: "Each experience includes a title, description, geo-location (latitude and longitude), an image, and a rating. Keywords may also be generated automatically from the title and description, or you can enter them separately."
        },
        {
            question: "Can I update or delete my experiences?",
            answer: "Yes, you can. Navigate to 'My Experiences', select the experience you want to update or delete, and use the provided options to make changes or remove the experience."
        },
        {
            question: "How are keywords generated for experiences?",
            answer: "Keywords are either automatically generated from the title and description of the experience, or you can manually enter them in a separate field when creating or editing an experience."
        },
        {
            question: "What should I do if I encounter issues or have questions not covered in this FAQ?",
            answer: "If you encounter any issues or have further questions, please contact our support team via the 'Contact Us' page. We're here to help!"
        }
    ];

    return (
        <div className={styles.faqPage}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                    <div key={index} className={styles.faqItem}>
                        <h2 className={styles.question}>{faq.question}</h2>
                        <p className={styles.answer}>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
