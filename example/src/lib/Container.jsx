import React from 'react'

export const Container = (Context, Layout) =>
  Component => {
    const Page    = Context.Consumer(Component);
    const Wrapper = Context.Consumer(Layout)

    Page.getLayout = page =>
      <Context.Provider>
        <Wrapper>
          {page}
        </Wrapper>
      </Context.Provider>

    return Page
  }

export default Container
