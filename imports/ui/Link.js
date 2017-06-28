import React from 'react';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLinks from './AddLink';
import LinksListFilters from './LinksListFilters';

export default () => {
      return (
        <div>
          <PrivateHeader title='Your Links' />
          <div className='page-content'>
            <LinksListFilters/>
            <AddLinks/>
            <LinksList/>
          </div>
        </div>
      );
}
