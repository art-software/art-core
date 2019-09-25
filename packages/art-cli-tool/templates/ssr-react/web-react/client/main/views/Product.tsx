import React from 'react';
// @ts-ignore
import style from '../styles/product.less';
import withStyles from 'isomorphic-style-loader/withStyles';

const products = [
  {
    name: 'product-1',
    desc: 'Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'
  },
  {
    name: 'product-2',
    desc: 'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.'
  },
  {
    name: 'product-3',
    desc: 'Am increasing at contrasted in favourable he considered astonished. As if made held in an shot. By it enough to valley desire do. Mrs chief great maids these which are ham match she. Abode to tried do thing maids. Doubtful disposed returned rejoiced to dashwood is so up.'
  },
  {
    name: 'product-4',
    desc: 'Boisterous he on understood attachment as entreaties ye devonshire. In mile an form snug were been sell. Hastened admitted joy nor absolute gay its. Extremely ham any his departure for contained curiosity defective. Way now instrument had eat diminution melancholy expression sentiments stimulated. One built fat you out manor books. Mrs interested now his affronting inquietude contrasted cultivated. Lasting showing expense greater on colonel no.'
  }
];

class Product extends React.Component<any, any> {

  public render() {
    return (
      <div className="product">
        <div className="product-wrapper">
          {
            products.map((product) => {
              return (
                <React.Fragment>
                  <div className="product-name">{ product.name }</div>
                  <div className="product-desc">{ product.desc }</div>
                </React.Fragment>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Product);