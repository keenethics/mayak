import React from "react";

export default function DemoHero() {
  return (
    <section className="bg-secondary-100 p-5">
      <h1 className="text-h1 font-bold text-primary-600">
        Шукай пункти психологічної підтримки у місті{" "}
        <span className="p-4 pt-2 text-secondary-500">Львові</span>
      </h1>
      <p className="mt-5 text-p1 font-bold">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </p>
      <p className="mt-5 text-p4 font-normal">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"></div>
    </section>
  );
}
