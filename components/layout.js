import Meta from './meta'

export default function Layout({ preview, children, title, content }) {


  return (
    <>
      <Meta title={title} content={content}/>
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}
