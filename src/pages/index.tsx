// import {GetStaticProps} from 'next';

// type StaticProps = { isReadyToRender: boolean };
// type Props = { isReadyToRender: boolean };
//
// export const getStaticProps: GetStaticProps<StaticProps> = () => {
//   return {
//     props: {
//       isReadyToRender: true,
//       serializedDataset: 'test',
//     },
//   };
// };

export { default, getServerSideProps } from './home';
