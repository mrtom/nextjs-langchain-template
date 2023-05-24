import 'server-only';

import { Form } from './form';

export const dynamic = 'force-dynamic';

export type SendRequsetAction = (formData: FormData) => Promise<string>;

export default async function IndexPage() {
  return <Form />;
}
