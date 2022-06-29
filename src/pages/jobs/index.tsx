import { jobs } from '@/constants/jobs';

export async function getStaticProps(context) {
  return {
    props: {
      list: Object.keys(jobs),
      isReadyToRender: true,
      serializedDataset: 'test',
    },
  };
}

export { default } from './[job]';
