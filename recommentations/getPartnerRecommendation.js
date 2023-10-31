const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.recommendationModel = async (nationalId) => {
    try {
        //https://recommendation?nationalId=${nationalId}
        // https://api.nationalize.io?name=nathaniel
        const recommendation = await fetch(``);
        const data = await recommendation.json();
        if (recommendation.status !== 200) {
            return {
                statusCode: 400,
                message: "could not get partner recommendation for you !",
                error: data.message
            }
        }
        return {
            statusCode: 200,
            message: "success",
            data: data
        }
    }
    catch (err) {
        console.log(err.message);
        return {
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
}

