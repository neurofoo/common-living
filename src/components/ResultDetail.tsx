export const DetailResult = ({ item }: { item: any }) => {
  return (
    <div className='relative p-5 md:mx-auto md:max-w-7xl grid grid-cols-1 md:grid-cols-12 overflow-hidden'>
      <img
        className='mx-auto m-5 md:col-span-3 h-48 w-48'
        src='/32x32.png'
        alt=''
      />
      <div className='md:col-span-6'>
        <dl className='grid grid-cols-4 gap-2'>
          <dt>ID:</dt>
          <dd className='col-span-3'>{item?._id}</dd>

          <dt>Name</dt>
          <dd className='col-span-3'>{item?.name}</dd>

          <dt>URL</dt>
          <dd className='col-span-3'>
            <a
              className='text-blue-500 underline truncate'
              href={item?.link}
              target='_blank'
              rel='noopener noreferrer'>
              {item?.link}
            </a>
          </dd>
        </dl>
        <dl className='mt-5 space-y-2'>
          <dt className=''>Description</dt>
          <dd>{item?.description}</dd>
        </dl>
      </div>
    </div>
  );
};
