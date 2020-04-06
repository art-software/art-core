import React from 'react';
// @ts-ignore
import style from '../styles/home.less';
import withStyles from 'art-isomorphic-style-loader/withStyles';
import { fetchDataMain } from '../store/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const topBanner = require('../assets/home/img-top-banner.jpg');

class Home extends React.Component<any, any> {

  public static serverFetch = fetchDataMain;

  public componentDidMount() {
    if (this.props.initialData && this.props.initialData.length <= 0) {
      this.props.fetchDataMain();
    }
  }

  public choiceAChange() {
    console.log('choiceAChange');
  }

  public choiceBChange() {
    console.log('choiceBChange');
  }

  public commandOnChange() {
    console.log('Common onChange');
  }

  public render() {
    const { initialData } = this.props;
    console.log('initialData: ', initialData);
    return (
      <React.Fragment>
        <div className="home">
          <img src={topBanner} alt="top banner"></img>

          <h1>{initialData.title}</h1>

          <Link to="/product">Product Page</Link>
          {/* <Route exact path="/product">Product Page</Route> */}

          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipiscin] velit, sed quia non numquam do eius modi tempora incididunt, ut labore et dolore magnam aliquam quaerat voluptatem.</p>

          <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur.</p>

          <h2>Vero eos et accusamus et iusto odio dignissimos ducimus</h2>

          <p>Qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. </p>

          <p>Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Qua temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae pondere ad lineam. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>

          <p>Quibus ego assentior, dum modo de iisdem rebus ne Graecos quidem legendos putent. Res vero bonaa verbis electis graviter omateque dictas quis i legat? Nisi qui se plane Graeciun dici velit, ut a 9 Scaeiola est praetore salutatus Athenis Albucius. Quem quidem locum cum multa venustate et omm sale idem Lucilius, apud quem praeclare Scaevola.</p>

          <p>Qui autem alia matunt scribi a nobis, aequi esse debent, quod et seripta multa sunt, sic ut plura nemini e nostris, et scribentur fortasse plura si vita suppetet; et tamen qui diligenter haec quae de philosophia Htteris mandamus legere assueverit, iudicabit nulla ad legendum his esse potiora.</p>

          <h3>Tempore intellegi convenire</h3>

          <p>Epicurus autem, in quibus sequitur Democritum, noil fere labitur, Quam- quam utriusque cum mutta non prolx). turn illiid in priniis, quoJ, cum in rerum nalura duo quaerenda sint, ununi quae materia sit ex qua quaeque res cfficiatur, alterum quae vis sit quae quidque efficiat, de materia disserucrunt, vim et causam efficiendi reliquerunt. Sed lioc commune vitiuni; illae Epicur propriae ruinae: censet enim eadem ilia indlvidua e solida corpora ferri deorsum suo pondere ad lineam i hunc naturalem esse omnium corporum motuni.</p>

          <p>Deinde ibidem homo acutus, cam illud occorreret, j omnia deorsum e regione ferrentur et, ut dixi, ad lineam, numquam fore ut atomus altera alteram posset attingere, itaque attulit rem commenticiam.</p>

          <p>Declinare dixit atomum perpaulum, quo nihil posset fieri minus; ita eifici complexiones et copulationes et adhaesiones atomorum inter se, ex quo eificeretur mundus omnesque partes mundi quaeque in eo essent. Quae cum res tota fieta sit piieriliter, turn ne efficit quidem^ quod vult. Nam et ipsa declinatio ad libidinem fiiigitur - ait enim deelinare atomum sine causa, quo nibil turpius physico quam fieri.</p>
        </div>

        <header role="banner">
          <h1>HTML5 Test Page</h1>
          <p>This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS systems and frameworks.</p>
        </header>

        <nav role="navigation">
          <ul>
            <li>
              <a href="#text">Text</a>
              <ul>
                <li><a href="#text__headings">Headings</a></li>
                <li><a href="#text__paragraphs">Paragraphs</a></li>
                <li><a href="#text__blockquotes">Blockquotes</a></li>
                <li><a href="#text__lists">Lists</a></li>
                <li><a href="#text__hr">Horizontal rules</a></li>
                <li><a href="#text__tables">Tabular data</a></li>
                <li><a href="#text__code">Code</a></li>
                <li><a href="#text__inline">Inline elements</a></li>
                <li><a href="#text__comments">HTML Comments</a></li>
              </ul>
            </li>
            <li>
              <a href="#embedded">Embedded content</a>
              <ul>
                <li><a href="#embedded__images">Images</a></li>
                <li><a href="#embedded__audio">Audio</a></li>
                <li><a href="#embedded__video">Video</a></li>
                <li><a href="#embedded__canvas">Canvas</a></li>
                <li><a href="#embedded__meter">Meter</a></li>
                <li><a href="#embedded__progress">Progress</a></li>
                <li><a href="#embedded__svg">Inline SVG</a></li>
                <li><a href="#embedded__iframe">IFrames</a></li>
              </ul>
            </li>
            <li>
              <a href="#forms">Form elements</a>
              <ul>
                <li><a href="#forms__input">Input fields</a></li>
                <li><a href="#forms__select">Select menus</a></li>
                <li><a href="#forms__checkbox">Checkboxes</a></li>
                <li><a href="#forms__radio">Radio buttons</a></li>
                <li><a href="#forms__textareas">Textareas</a></li>
                <li><a href="#forms__html5">HTML5 inputs</a></li>
                <li><a href="#forms__action">Action buttons</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        <main role="main">
          <section id="text">
            <header><h1>Text</h1></header>
            <article id="text__headings">
              <header>
                <h1>Headings</h1>
              </header>
              <div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__paragraphs">
              <header><h1>Paragraphs</h1></header>
              <div>
                <p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__blockquotes">
              <header><h1>Blockquotes</h1></header>
              <div>
                <blockquote>
                  <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                  <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                  <cite><a href="#!">Said no one, ever.</a></cite>
                </blockquote>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__lists">
              <header><h1>Lists</h1></header>
              <div>
                <h3>Definition list</h3>
                <dl>
                  <dt>Definition List Title</dt>
                  <dd>This is a definition list division.</dd>
                </dl>
                <h3>Ordered List</h3>
                <ol>
                  <li>List Item 1</li>
                  <li>List Item 2</li>
                  <li>List Item 3</li>
                </ol>
                <h3>Unordered List</h3>
                <ul>
                  <li>List Item 1</li>
                  <li>List Item 2</li>
                  <li>List Item 3</li>
                </ul>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__hr">
              <header><h1>Horizontal rules</h1></header>
              <div>
                <hr />
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__tables">
              <header><h1>Tabular data</h1></header>
              <table>
                <caption>Table Caption</caption>
                <thead>
                  <tr>
                    <th>Table Heading 1</th>
                    <th>Table Heading 2</th>
                    <th>Table Heading 3</th>
                    <th>Table Heading 4</th>
                    <th>Table Heading 5</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Table Footer 1</th>
                    <th>Table Footer 2</th>
                    <th>Table Footer 3</th>
                    <th>Table Footer 4</th>
                    <th>Table Footer 5</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                  </tr>
                  <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                  </tr>
                  <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                  </tr>
                  <tr>
                    <td>Table Cell 1</td>
                    <td>Table Cell 2</td>
                    <td>Table Cell 3</td>
                    <td>Table Cell 4</td>
                    <td>Table Cell 5</td>
                  </tr>
                </tbody>
              </table>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__code">
              <header><h1>Code</h1></header>
              <div>
                <p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
                <p><strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code></p>
                <p><strong>Sample output:</strong> <samp>This is sample output from a computer program.</samp></p>
                <h2>Pre-formatted text</h2>
                <pre>P R E F O R M A T T E D T E X T
                ! " # $ % &amp; ' ( ) * + , - . /
                0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
                @ A B C D E F G H I J K L M N O
                P Q R S T U V W X Y Z [ \ ] ^ _
                ` a b c d e f g h i j k l m n o
                  p q r s t u v w x y z  ~ </pre>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__inline">
              <header><h1>Inline elements</h1></header>
              <div>
                <p><a href="#!">This is a text link</a>.</p>
                <p><strong>Strong is used to indicate strong importance.</strong></p>
                <p><em>This text has added emphasis.</em></p>
                <p>The <b>b element</b> is stylistically different text from normal text, without any special importance.</p>
                <p>The <i>i element</i> is text that is offset from the normal text.</p>
                <p>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.</p>
                <p><del>This text is deleted</del> and <ins>This text is inserted</ins>.</p>
                <p><s>This text has a strikethrough</s>.</p>
                <p>Superscript<sup>®</sup>.</p>
                <p>Subscript for things like H<sub>2</sub>O.</p>
                <p><small>This small text is small for for fine print, etc.</small></p>
                <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
                <p><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q></p>
                <p><cite>This is a citation.</cite></p>
                <p>The <dfn>dfn element</dfn> indicates a definition.</p>
                <p>The <mark>mark element</mark> indicates a highlight.</p>
                <p>The <var>variable element</var>, such as <var>x</var> = <var>y</var>.</p>
                <p>The time element: <time data-datetime="2013-04-06T12:32+00:00">2 weeks ago</time></p>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="text__comments">
              <header><h1>HTML Comments</h1></header>
              <div>
                <p>There is a comment spanning multiple tags and lines below here.</p>
                <p><a href="#!">This is a text link. But it should not be displayed in a comment</a>.</p>
                <p><strong>Strong is used to indicate strong importance. But, it should not be displayed in a comment</strong></p>
                <p><em>This text has added emphasis. But, it should not be displayed in a comment</em></p>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
          </section>
          <section id="embedded">
            <header><h1>Embedded content</h1></header>
            <article id="embedded__images">
              <header><h2>Images</h2></header>
              <div>
                <h3>No <code>&lt;figure&gt;</code> element</h3>
                <p><img src="http://placekitten.com/480/480" alt="Image alt text" /></p>
                <h3>Wrapped in a <code>&lt;figure&gt;</code> element, no <code>&lt;figcaption&gt;</code></h3>
                <figure><img src="http://placekitten.com/420/420" alt="Image alt text" /></figure>
                <h3>Wrapped in a <code>&lt;figure&gt;</code> element, with a <code>&lt;figcaption&gt;</code></h3>
                <figure>
                  <img src="http://placekitten.com/420/420" alt="Image alt text" />
                  <figcaption>Here is a caption for this image.</figcaption>
                </figure>
              </div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__audio">
              <header><h2>Audio</h2></header>
              <div><audio controls={false}>audio</audio></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__video">
              <header><h2>Video</h2></header>
              <div><video controls={false}>video</video></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__canvas">
              <header><h2>Canvas</h2></header>
              <div><canvas>canvas</canvas></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__meter">
              <header><h2>Meter</h2></header>
              <div><meter value="2" min="0" max="10" onChange={this.commandOnChange}>2 out of 10</meter></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__progress">
              <header><h2>Progress</h2></header>
              <div><progress>progress</progress></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__svg">
              <header><h2>Inline SVG</h2></header>
              <div><svg width="100px" height="100px"><circle cx="100" cy="100" r="100" fill="#1fa3ec"></circle></svg></div>
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
            <article id="embedded__iframe">
              <header><h2>IFrame</h2></header>
              {/* <div><iframe src="//tmall.com" height="300"></iframe></div> */}
              <footer><p><a href="#top">[Top]</a></p></footer>
            </article>
          </section>
          <section id="forms">
            <header><h1>Form elements</h1></header>
            <form>
              <fieldset id="forms__input">
                <legend>Input fields</legend>
                <p>
                  <label htmlFor="input__text">Text Input</label>
                  <input id="input__text" type="text" placeholder="Text Input" />
                </p>
                <p>
                  <label htmlFor="input__password">Password</label>
                  <input id="input__password" type="password" placeholder="Type your Password" />
                </p>
                <p>
                  <label htmlFor="input__webaddress">Web Address</label>
                  <input id="input__webaddress" type="url" placeholder="http://yoursite.com" />
                </p>
                <p>
                  <label htmlFor="input__emailaddress">Email Address</label>
                  <input id="input__emailaddress" type="email" placeholder="name@email.com" />
                </p>
                <p>
                  <label htmlFor="input__phone">Phone Number</label>
                  <input id="input__phone" type="tel" placeholder="(999) 999-9999" />
                </p>
                <p>
                  <label htmlFor="input__search">Search</label>
                  <input id="input__search" type="search" placeholder="Enter Search Term" />
                </p>
                <p>
                  <label htmlFor="input__text2">Number Input</label>
                  <input id="input__text2" type="number" placeholder="Enter a Number" />
                </p>
                <p>
                  <label htmlFor="input__text3" className="error">Error</label>
                  <input id="input__text3" className="is-error" type="text" placeholder="Text Input" />
                </p>
                <p>
                  <label htmlFor="input__text4" className="valid">Valid</label>
                  <input id="input__text4" className="is-valid" type="text" placeholder="Text Input" />
                </p>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__select">
                <legend>Select menus</legend>
                <p>
                  <label htmlFor="select">Select</label>
                  <select id="select">
                    <optgroup label="Option Group">
                      <option>Option One</option>
                      <option>Option Two</option>
                      <option>Option Three</option>
                    </optgroup>
                  </select>
                </p>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__checkbox">
                <legend>Checkboxes</legend>
                <ul className="list list--bare">
                  <li><label htmlFor="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked={true} onChange={this.choiceAChange} /> Choice A</label></li>
                  <li><label htmlFor="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox" /> Choice B</label></li>
                  <li><label htmlFor="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox" /> Choice C</label></li>
                </ul>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__radio">
                <legend>Radio buttons</legend>
                <ul className="list list--bare">
                  <li><label htmlFor="radio1"><input id="radio1" name="radio" type="radio" className="radio" checked={true} onChange={this.choiceBChange} /> Option 1</label></li>
                  <li><label htmlFor="radio2"><input id="radio2" name="radio" type="radio" className="radio" /> Option 2</label></li>
                  <li><label htmlFor="radio3"><input id="radio3" name="radio" type="radio" className="radio" /> Option 3</label></li>
                </ul>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__textareas">
                <legend>Textareas</legend>
                <p>
                  <label htmlFor="textarea">Textarea</label>
                  <textarea id="textarea" rows={8} cols={48} placeholder="Enter your message here"></textarea>
                </p>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__html5">
                <legend>HTML5 inputs</legend>
                <p>
                  <label htmlFor="ic">Color input</label>
                  <input type="color" id="ic" value="#000000" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="in">Number input</label>
                  <input type="number" id="in" min="0" max="10" value="5" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="ir">Range input</label>
                  <input type="range" id="ir" value="10" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="idd">Date input</label>
                  <input type="date" id="idd" value="1970-01-01" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="idm">Month input</label>
                  <input type="month" id="idm" value="1970-01" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="idw">Week input</label>
                  <input type="week" id="idw" value="1970-W01" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="idt">Datetime input</label>
                  <input type="datetime" id="idt" value="1970-01-01T00:00:00Z" onChange={this.commandOnChange} />
                </p>
                <p>
                  <label htmlFor="idtl">Datetime-local input</label>
                  <input type="datetime-local" id="idtl" value="1970-01-01T00:00" onChange={this.commandOnChange} />
                </p>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
              <fieldset id="forms__action">
                <legend>Action buttons</legend>
                <p>
                  <input type="submit" value="<input type=submit>" onChange={this.commandOnChange} />
                  <input type="button" value="<input type=button>" onChange={this.commandOnChange} />
                  <input type="reset" value="<input type=reset>" onChange={this.commandOnChange} />
                  <input type="submit" value="<input disabled>" disabled />
                </p>
                <p>
                  <button type="submit">&lt;button type=submit&gt;</button>
                  <button type="button">&lt;button type=button&gt;</button>
                  <button type="reset">&lt;button type=reset&gt;</button>
                  <button type="button" disabled>&lt;button disabled&gt;</button>
                </p>
              </fieldset>
              <p><a href="#top">[Top]</a></p>
            </form>
          </section>
        </main>
        <div>


          <p>1. Overview 51.1 Introduction 51.1.1 Design Principles 51.2 Open Financial Exchange at
          a Glance 71.2.1 Data Transport 71.2.2 Request and Response Model 81.3 Conventions 92.
          Structure 102.1 HTTP Headers 102.2 Open Financial Exchange Headers 112.2.1 The Meaning of
          Version Numbers 122.3 SGML Details 122.3.1 Compliance 122.3.2 Special Characters 122.4
          Open Financial Exchange SGML Structure 132.4.1 Overview 132.4.2 Top Level 132.4.3 Messages
          132.4.4 Message Sets and Version Control 142.4.5 Transactions 152.5 The Signon Message Set
          162.5.1 Signon &lt;SONRQ&gt; &lt;SONRS&gt; 162.5.2 PIN Change &lt;PINCHRQ&gt;
          &lt;PINCHRS&gt; 192.5.3 Examples 202.6 External Data Support 202.7 Extensions to Open
          Financial Exchange 213. Common Aggregates, Elements, and Data Types 223.1 Common
          Aggregates 223.1.1 Identifying Financial Institutions and Accounts 223.1.2 Balance Records
          &lt;BAL&gt; 223.1.3 Error Reporting &lt;STATUS&gt; 233.2 Common Elements 243.2.1 Financial
          Institution Transaction ID &lt;FITID&gt; 243.2.2 Server-Assigned ID &lt;SRVRTID&gt;
          243.2.3 Client-Assigned Transaction UID &lt;TRNUID&gt; 253.2.4 Token &lt;TOKEN&gt; 253.2.5
          Transaction Amount &lt;TRNAMT&gt; 253.2.6 Memo &lt;MEMO&gt; 253.2.7 Date Start and Date
          End &lt;DTSTART&gt; &lt;DTEND&gt; 263.3 Common data types 263.3.1 Dates and Times 263.3.2
          Amounts, Prices, and Quantities 283.3.3 Language 283.3.4 Basic data types 284. Security
          294.1 Security Solutions 294.1.1 Determining Security Levels &lt;OFXSEC&gt;
          &lt;TRANSPSEC&gt; 294.2 Channel-Level Security 304.2.1 Security Requirements 304.2.2 Using
          SSL 3.0 in Open Financial Exchange 304.3 Application-Level Security 314.3.1 Requirements
          for Application-Layer Security 314.3.2 Using Application-level Encryption in Open
          Financial Exchange 325. International Support 335.1 Language and Encoding 335.2 Currency
          &lt;CURDEF&gt; &lt;CURRENCY&gt; &lt;ORIGCURRENCY&gt; 335.3 Country-Specific Tag Values
          346. Data Synchronization 356.1 Overview 356.2 Background 356.3 Data Synchronization
          Approach 366.4 Data Synchronization Specifics 376.5 Conflict Detection and Resolution
          396.6 Synchronization vs. Refresh 406.7 Typical Server Architecture for Synchronization
          416.8 Typical Client Processing of Synchronization Results 436.9 Simultaneous Connections
          446.10 Synchronization Alternatives 446.10.1 Lite Synchronization 446.10.2 Relating
          Synchronization and Error Recovery 456.11 Examples 467. FI Profile 487.1 Overview 487.1.1
          Message Sets 487.1.2 Version Control 497.1.3 Batching and Routing 497.2 Profile Request
          507.3 Profile Response 517.3.1 Message Set 527.3.2 Signon Realms 537.3.3 Status Codes
          537.4 Profile Message Set Profile Information 548. Activation &amp; Account Information
          558.1 Overview 558.2 Approaches to User Sign-Up with Open Financial Exchange 558.3 Users
          and Accounts 568.4 Enrollment and Password Acquisition &lt;ENROLLRQ&gt; &lt;ENROLLRS&gt;
          568.4.1 User IDs 578.4.2 Enrollment Request 578.4.3 Enrollment Response 598.4.4 Enrollment
          Status Codes 598.4.5 Examples 608.5 Account Information 608.5.1 Request &lt;ACCTINFORQ&gt;
          618.5.2 Response &lt;ACCTINFORS&gt; 618.5.3 Account Information Aggregate &lt;ACCTINFO&gt;
          628.5.4 Status Codes 628.5.5 Examples 638.6 Service Activation 638.6.1 Activation Request
          and Response 648.6.2 Service Activation Synchronization 668.6.3 Examples 668.7 Name and
          Address Changes &lt;CHGUSERINFORQ&gt; &lt;CHGUSERINFORS&gt; 678.7.1 &lt;CHGUSERINFORQ&gt;
          678.7.2 &lt;CHGUSERINFORS&gt; 688.7.3 Status Codes 688.8 Signup Message Set Profile
          Information 699. Customer to FI Communication 709.1 The E-Mail Message Set 709.2 E-Mail
          Messages 709.2.1 Regular vs. Specialized E-Mail 719.2.2 Basic &lt;MAIL&gt; Aggregate
          719.2.3 E-Mail &lt;MAILRQ&gt; &lt;MAILRS&gt; 719.2.4 E-Mail Synchronization
          &lt;MAILSYNCRQ&gt; &lt;MAILSYNCRS&gt; 729.2.5 Example 739.3 Get HTML Page 749.3.1 MIME Get
          Request and Response &lt;GETMIMERQ&gt; &lt;GETMIMERS&gt; 749.3.2 Example 759.4 E-Mail
          Message Set Profile Information 7610. Recurring Transactions 7710.1 Creating a Recurring
          Model 7710.2 Recurring Instructions &lt;RECURRINST&gt; 7710.2.1 Values for &lt;FREQ&gt;
          7810.2.2 Examples 7910.3 Retrieving Transactions Generated by a Recurring Model 8010.4
          Modifying and Canceling Individual Transactions 8010.5 Modifying and Canceling Recurring
          Models 8010.5.1 Examples 81
        </p>
          <p>Open Financial Exchange is a broad-based framework for exchanging
          financial data and instructions between customers and their financial institutions. It
          allows institutions to connect directly to their customers without requiring an
          intermediary. <br />
          </p>
        </div>


      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  initialData: state.data
});

const mapDispatchToProps = {
  fetchDataMain
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Home));