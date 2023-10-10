import React from 'react'
import rule from '../assets/rule.png'

const item = [
    {
        idx: '01',
        heading: 'Borrowing',
        content: <span>A book can be borrowed in 1 week.<br />Each reader can borrow up to <span className='text-red'>2</span> books per week.</span>
    },
    {
        idx: '02',
        heading: 'Renewal',
        content: <span>A book may only be renewed <span className='text-red'>once</span>.</span>
    },
    {
        idx: '03',
        heading: 'Overdue/Lost books',
        content: <span>Any reader who does not return/renew a book on the due date will be fined <span className='text-red'>5000</span> VND/book/day.<br />Readers will be fined <span className='text-red'>200%</span> of the book's price for losing it.</span>
    },
]

const Rules = () => {
  return (
    <div className='w-full space-y-8 py-2 pr-4 pl-3'>
        <h1 className='text-2xl font-semibold text-center'>LIBOO RULES</h1>
        <div className='w-full flex gap-8'>
            <img src={rule} alt='rule' className='w-1/3 h-auto shrink-0'/>
            <div className='w-full space-y-10'>
                {item.map((rule, index) => (
                    <div key={index} className='w-full flex gap-4'>
                        <p className='text-3xl text-red font-bold'>{rule.idx}</p>
                        <div className='space-y-2'>
                            <p className='text-xl font-medium'>{rule.heading}</p>
                            <p className='text-base'>{rule.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Rules