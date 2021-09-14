export const SearchResult = ({
  item,
  handleSelect,
}: {
  item: any;
  handleSelect: any;
}) => {
  return (
    <li
      role='button'
      className='mx-5 p-2 flex border shadow hover:shadow-2xl overflow-hidden'
      key={item._id}
      onClick={() => handleSelect(item)}>
      <img
        className=''
        src={item?.picture || '/32x32.png'}
        alt={item?.name || 'search result icon'}
      />
      <div className='ml-5 overflow-hidden'>
        <h1>{item.name}</h1>
        <p className='max-w-sm truncate'>{item.description}</p>
      </div>
    </li>
  );
};
