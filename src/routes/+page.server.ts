import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { z } from 'zod';

const postSchema = z.object({

	questions: z
		.object({
			text: z.string(),
			generated: z.boolean()
		})
		.array()
		.min(1, {
			message: 'Must have at least one question'
		})
});

export const load = async () => {
	const form = await superValidate(postSchema);
	return { form };
};

export const actions = {
	default: async (event) => {

		const form = await superValidate(event, postSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});

		}
		return { form };
	},


};

