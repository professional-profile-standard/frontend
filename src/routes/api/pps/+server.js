const pps_search_param = "pps_url"

export async function GET({ request }) {
    try {
        const pps_url = new URL(request.url).searchParams.get(pps_search_param)
        const res = await fetch(pps_url)
        if (!res.ok) throw new Error("Could not fetch PPS")
        const body = await res.text()
        return new Response(body)
    }
    catch (e) {
        return new Response(null, { status: 404 })
    }
}