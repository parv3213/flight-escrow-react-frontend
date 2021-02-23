import React from "react";

export default function Footer(props) {
	return (
		<footer class="text-center text-back" style={{ "background-color": "#f1f1f1" }}>
			<div class="container pt-4">
				<section class="mb-4">
					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-facebook-f"></i>
					</a>

					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-twitter"></i>
					</a>

					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-google"></i>
					</a>

					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-instagram"></i>
					</a>

					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-linkedin"></i>
					</a>
					<a
						class="btn btn-link btn-floating btn-lg text-dark m-1"
						href="#!"
						role="button"
						data-mdb-ripple-color="dark"
					>
						<i class="fab fa-github"></i>
					</a>
				</section>
			</div>

			<div class="text-center text-dark p-3" style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}>
				© 2020 Copyright:
				<a class="text-dark" href="https://mdbootstrap.com/">
					MDBootstrap.com
				</a>
			</div>
		</footer>
	);
}
