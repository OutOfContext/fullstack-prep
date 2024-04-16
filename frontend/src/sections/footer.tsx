
export default function Footer() {

    return (
        <footer style={{backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px'}}>
            <h3>Recap Projects</h3>
            <p>&copy; {new Date().getFullYear()} neuefische GmbH. All rights reserved.</p>
        </footer>
    )
}