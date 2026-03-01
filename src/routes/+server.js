import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { userToken } = await request.json();
	return json({}, { status: 301 });
}