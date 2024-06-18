import React from 'react';
import styles from './FAQ.module.css'; // Assuming you have a corresponding CSS module for styling

const FAQ = () => {
    const faqs = [
        {
            question: "How do I register and login?",
            answer: "Clicking the Login button or the Add Experience/Trip button will redirect you to the login page where you can login or signup."
        },
        {
            question: "How can I create an experience?",
            answer: "Once logged in, navigate to the 'Add Experience' section from the main menu. Fill in the experience title, description, and upload an image. Click 'Submit' to create your experience."
        },
        {
            question: "How do I search for experiences by location or keyword?",
            answer: "Use the search bar on the homepage. Enter the location or keyword and click 'Search'. A list of experiences that match your query will be displayed."
        },
        {
            question: "Where can I view search results?",
            answer: "After performing a search by location or keyword, the results will be displayed in a list format. You can scroll through the list to view the different experiences available."
        },
        {
            question: "How can I view an experience from the search results list?",
            answer: "Click on the title or image of any experience in the search results list. This will open the detailed view of the experience, where you can read the full description."
        },
        {
            question: "What are trips, and how can I create one?",
            answer: "Trips are user-named collections of experiences. To create a trip, go to the 'Add Trip' section, enter a trip name, description, and image, and save it."
        },
        {
            question: "How can I add experiences to my trips?",
            answer: "While viewing an experience, you will see an option to 'Add to Trip'. Select the trip you want to add the experience to from the dropdown menu."
        },
        {
            question: "How do I manage my trips?",
            answer: "In the 'My Trips' section (NOTE: not yet implemented), you can view all your trips. Click on a trip to view the experiences added to it. You can also edit the trip name or delete the trip entirely."
        },
        {
            question: "What information do experiences include?",
            answer: "Each experience includes a title, description, and an image."
        },
        {
            question: "Can I update or delete my experiences?",
            answer: "Yes, you can. Navigate to 'My Experiences' (NOTE: not yet implemented), select the experience you want to update or delete, and use the provided options to make changes or remove the experience."
        },
        {
            question: "Where did you find your app icon?",
            answer: "The app icon was created by Freepik - Flaticon. Here is a link to their website: https://www.flaticon.com/free-icons/travel"
        },
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
