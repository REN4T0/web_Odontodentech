export default async function login(obj) {
    try {

        const req = await fetch(`https://dentech-api.vercel.app/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        const res = await req.json();

        return res;
        
    } catch (error) {
        console.error(error)
        return false;
    }
}