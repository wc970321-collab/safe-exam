'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 检查是否已登录
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const handleAuth = async (type: 'login' | 'signup') => {
    const { data, error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    
    if (error) alert(error.message)
    else {
      alert(type === 'login' ? '登录成功！' : '注册成功！')
      window.location.href = '/' // 登录后跳转首页
    }
  }

  if (user) return (
    <div className="max-w-md mx-auto mt-20 p-6 text-center">
      <p className="mb-4">当前登录账号：{user.email}</p>
      <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-red-500 underline">退出登录</button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">备考进度云同步</h1>
      <div className="space-y-4">
        <input className="w-full border p-3 rounded" type="email" placeholder="邮箱" onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-3 rounded" type="password" placeholder="密码" onChange={e => setPassword(e.target.value)} />
        <button onClick={() => handleAuth('login')} className="w-full bg-blue-600 text-white p-3 rounded font-bold">登录</button>
        <button onClick={() => handleAuth('signup')} className="w-full bg-gray-100 text-gray-600 p-3 rounded hover:bg-gray-200">注册新账号</button>
      </div>
      <p className="mt-4 text-xs text-gray-400 text-center">注册后即可在不同设备同步刷题进度</p>
    </div>
  )
}
