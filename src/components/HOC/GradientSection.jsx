import PropTypes from 'prop-types';

export const GradientSection = ({ wrapperClassName, className, children }) => (
    <section className={`px-1 'lg:px-8 xl:px-20' py-12 ${wrapperClassName}`}>
        <div className={`px-4 md:p-16 py-12 md:py-16 bg-[linear-gradient(0deg,_#FFFFFF_0%,_#FFFFFF_50%,_#EDF4FE_100%)] rounded-[2rem] md:rounded-[3.5rem] ${className}`}>
            {children}
        </div>
    </section>
)

GradientSection.propTypes = {
    wrapperClassName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
}