import { useState, useRef } from 'react'
import Hero from '../components/Hero'
import ConsultResult from '../components/ConsultResult'
import Categories from '../components/Categories'
import QuoteBand from '../components/QuoteBand'
import Doshas from '../components/Doshas'
import Principles from '../components/Principles'
import DoshaQuiz from '../components/DoshaQuiz'
import HerbEncyclopedia from '../components/HerbEncyclopedia'
import { useApi } from '../hooks/useApi'

export default function Home() {
  const { call, loading, error } = useApi()
  const [result, setResult]     = useState(null)
  const resultRef               = useRef(null)

  const handleSearch = async (query) => {
    setResult(null)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    const data = await call('/api/consult', { query })
    if (data) setResult(data)
  }

  const showResult = loading || !!result || !!error

  return (
    <>
      <Hero onSearch={handleSearch} />

      <div ref={resultRef}>
        <ConsultResult data={result} loading={loading} error={error} />
      </div>

      {showResult && (
        <div className="ornament-sep">꩜ ◈ ꩜ ◈ ꩜</div>
      )}

      <Categories />

      <QuoteBand />

      <HerbEncyclopedia />

      <div className="ornament-sep">◈ ◈ ◈</div>

      <Doshas />

      <div className="ornament-sep" style={{ padding: '1.5rem 0' }}>◈ ◈ ◈</div>

      <DoshaQuiz />

      <div className="ornament-sep" style={{ padding: '1.5rem 0' }}>◈ ◈ ◈</div>

      <Principles />
    </>
  )
}
