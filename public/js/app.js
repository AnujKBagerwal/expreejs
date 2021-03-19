const App = () => {
  const [products, setProducts] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [errorName, setErrorName] = React.useState('');
  const [errorPrice, setErrorPrice] = React.useState('');
  const [form, setForm] = React.useState({
    name: '',
    price: '',
  });

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const ToggleModal = () => {
    setModal(!modal);
  };
  const fetchProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  const updateField = (e) => {
    let { name, value } = e.target;
    setErrorName('');
    setErrorPrice('');
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      setErrorName('Please Enter Name');
      return;
    }
    if (!form.price) {
      setErrorPrice('PLease Enter Price');
      return;
    }
    let requestMethod = '';
    if (form.id) {
      requestMethod = 'PUT';
    } else {
      requestMethod = 'POST';
    }
    fetch('/api/products', {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProducts();
        setForm({
          name: '',
          price: '',
        });
      });
    ToggleModal();
  };

  const deleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchProducts();
      });
  };

  const EditProduct = (product) => {
    ToggleModal();
    setForm(product);
  };

  return (
    <div>
      <div className='d-flex flex-row-reverse bd-highlight'>
        <button
          className='btn btn-primary ml-auto'
          onClick={() => ToggleModal()}
        >
          Add New Product
        </button>
      </div>
      {modal && (
        <div
          className='modal-dialog modal-dialog-centered'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='staticBackdropLabel'>
                  Add a Product
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={() => ToggleModal()}
                ></button>
              </div>
              <div className='modal-body'>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  placeholder='Product Name'
                  className='form-control mt-3'
                  onChange={(e) => updateField(e)}
                />
                <span style={{ color: 'red', marginBottom: '4px' }}>
                  {errorName}
                </span>
                <input
                  type='number'
                  name='price'
                  min='1'
                  value={form.price}
                  placeholder='Product Price'
                  className='form-control mt-3'
                  onChange={(e) => updateField(e)}
                />
                <span style={{ color: 'red', marginBottom: '4px' }}>
                  {errorPrice}
                </span>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                  onClick={() => ToggleModal()}
                >
                  Close
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ul className='list-group mt-4'>
        {products.map((product) => (
          <li
            key={product.id}
            className='list-group-item d-flex   bd-highlight'
          >
            <div className='flex-grow-1 bd-highlight'>
              <strong> {product.name}: </strong>${product.price}
            </div>
            <div className='bd-highlight'>
              <button onClick={() => EditProduct(product)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-pencil-square '
                  viewBox='0 0 16 16'
                >
                  <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                  <path
                    fillRule='evenodd'
                    d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                  />
                </svg>
              </button>
            </div>
            <div className='bd-highlight'>
              <button className='btn' onClick={() => deleteProduct(product.id)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-trash '
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                  <path
                    fillRule='evenodd'
                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
