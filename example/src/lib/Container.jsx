import React from 'react'

// Higher Order Component which takes a Context object and a Layout component.
// It wraps both in the Context.Provider and then makes both the Layout and
// Component consumers of the Context.  This allows the Layout and Component
// to access any items provided by the Context.

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
