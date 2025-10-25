import React from 'react'

const Header: React.FC = () => (
  <header style={{padding: '1rem 0', borderBottom: '1px solid var(--border, #eaeaea)'}}>
    <div style={{maxWidth: 1000, margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <h1 style={{margin: 0, fontSize: '1.25rem'}}>Country Explorer</h1>
      <nav>
        <a href="#/" style={{marginRight: 12}}>Home</a>
        <a href="#/login" style={{marginRight: 12}}>Login</a>
        <a href="#/register">Register</a>
      </nav>
    </div>
  </header>
)

export default Header
